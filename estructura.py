import os

ROOT_DIR = r"C:\Users\Benja\Desktop\pet-alert-platform"

ALLOWED_EXTENSIONS = {".tsx", ".ts", ".jsx", ".js", ".css", ".html"}

IGNORED_DIRS = {"node_modules", "dist", "build", ".git", ".next", "out"}

MAX_FILE_SIZE = 1024 * 1024  # 1 MB


def scan_project(root_dir):
    structure = []
    files_content = {}

    for folder, subfolders, files in os.walk(root_dir):

        subfolders[:] = [d for d in subfolders if d not in IGNORED_DIRS]

        level = folder.replace(root_dir, "").count(os.sep)
        indent = "  " * level

        structure.append(f"{indent}{os.path.basename(folder)}/")

        for file in files:
            ext = os.path.splitext(file)[1].lower()
            file_path = os.path.join(folder, file)

            structure.append(f"{indent}  {file}")

            if ext in ALLOWED_EXTENSIONS:
                try:
                    if os.path.getsize(file_path) > MAX_FILE_SIZE:
                        continue

                    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                        content = f.read()

                    relative_path = os.path.relpath(file_path, root_dir)
                    files_content[relative_path] = content

                except Exception as e:
                    print(f"Error leyendo {file_path}: {e}")

    return structure, files_content


def save_output(structure, files_content):
    with open("estructura.txt", "w", encoding="utf-8") as f:
        f.write("=== ESTRUCTURA DEL PROYECTO ===\n\n")
        f.write("\n".join(structure))

    with open("codigo_extraido.txt", "w", encoding="utf-8") as f:
        f.write("=== CODIGO EXTRAIDO ===\n\n")

        for path, content in files_content.items():
            f.write(f"\n\n===== {path} =====\n\n")
            f.write(content)


if __name__ == "__main__":
    structure, files_content = scan_project(ROOT_DIR)

    print(f"Archivos de código encontrados: {len(files_content)}")

    save_output(structure, files_content)

    print("Listo: estructura.txt y codigo_extraido.txt generados.")