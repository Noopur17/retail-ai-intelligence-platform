from pathlib import Path


def load_markdown_documents(data_dir: Path):
    documents = []

    markdown_files = list(data_dir.glob("*.md"))

    for file_path in markdown_files:
        content = file_path.read_text(encoding="utf-8")

        documents.append({
            "source": file_path.name,
            "content": content
        })

    return documents