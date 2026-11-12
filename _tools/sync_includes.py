# -*- coding: utf-8 -*-
"""Копирует общие блоки из _includes/ во все страницы сайта.

Страницы остаются цельными HTML-файлами (их можно открыть Live Server или
выложить как есть). Общий блок в странице обрамлён метками:

    <!-- include: header.html root="../" home="../" -->
    ...здесь содержимое _includes/header.html...
    <!-- /include: header.html -->

Скрипт заменяет всё между метками на актуальное содержимое файла из _includes/,
подставляя параметры: {{root}} в файле блока -> значение root="..." из метки.

    python _tools/sync_includes.py          обновить все страницы
    python _tools/sync_includes.py --check  только проверить (для git pre-commit)
    python _tools/sync_includes.py --watch  обновлять при каждом сохранении блока
"""
import os
import re
import sys
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INCLUDES = os.path.join(ROOT, "_includes")
BLOCK = re.compile(
    r"(<!-- include: (\S+)((?: \w+=\"[^\"]*\")*) -->\n)(.*?)(\n<!-- /include: \2 -->)",
    re.S,
)


def read(path):
    with open(path, encoding="utf-8", newline="") as f:
        return f.read()


def render(name, params):
    body = read(os.path.join(INCLUDES, name))
    return re.sub(r"\{\{(\w+)\}\}", lambda m: params.get(m.group(1), ""), body)


def pages():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if not d.startswith((".", "_")) and d != "landings"]
        for name in filenames:
            if name.endswith(".html"):
                yield os.path.join(dirpath, name)


def sync(check_only=False):
    changed = []
    for path in pages():
        text = read(path)
        if "<!-- include: " not in text:
            continue

        def repl(m):
            params = dict(re.findall(r'(\w+)="([^"]*)"', m.group(3)))
            return m.group(1) + render(m.group(2), params) + m.group(5)

        new = BLOCK.sub(repl, text)
        if text.count("<!-- include: ") != len(BLOCK.findall(text)):
            sys.exit(f"Ошибка: в {os.path.relpath(path, ROOT)} есть метка include без закрывающей метки")
        if new != text:
            changed.append(os.path.relpath(path, ROOT))
            if not check_only:
                with open(path, "w", encoding="utf-8", newline="") as f:
                    f.write(new)
    return changed


def main():
    if "--check" in sys.argv:
        changed = sync(check_only=True)
        if changed:
            print("Общие блоки в страницах устарели: " + ", ".join(changed))
            print("Запустите: python _tools/sync_includes.py")
            sys.exit(1)
        return
    if "--watch" in sys.argv:
        print("Слежу за _includes/ (Ctrl+C для выхода)")
        last = None
        while True:
            stamp = [os.path.getmtime(os.path.join(INCLUDES, n)) for n in sorted(os.listdir(INCLUDES))]
            if stamp != last:
                last = stamp
                for p in sync():
                    print("обновлено:", p)
            time.sleep(0.5)
    changed = sync()
    print("Обновлено страниц: %d" % len(changed) + (" (" + ", ".join(changed) + ")" if changed else ""))


if __name__ == "__main__":
    main()
