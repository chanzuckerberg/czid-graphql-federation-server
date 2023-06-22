import json
import sys

def generate_property_schema(value):
    if isinstance(value, dict):
        return generate_mesh_schema(value)
    elif isinstance(value, list):
        return {
            "type": "array",
            "items": generate_property_schema(value[0]) if value else { "type": "object" }
        }
    else:
        return { "type": type(value).__name__ }

def generate_mesh_schema(json_object):
    mesh_schema = {
        "type": "object",
        "properties": {}
    }

    for key, value in json_object.items():
        mesh_schema['properties'][key] = generate_property_schema(value)

    return mesh_schema

def load_json_from_file(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

def save_json_to_file(json_object, file_path):
    with open(file_path, 'w') as f:
        json.dump(json_object, f, indent=4)

def main():
    if len(sys.argv) != 3:
        print("Usage: python3 create_json_schema.py <path_to_input_json_file> <path_to_output_file>")
        sys.exit(1)

    json_file_path = sys.argv[1]
    output_file_path = sys.argv[2]
    json_object = load_json_from_file(json_file_path)
    mesh_schema = generate_mesh_schema(json_object)

    if mesh_schema is not None:
        save_json_to_file(mesh_schema, output_file_path)
        print(f"Mesh schema saved to {output_file_path}")
    else:
        print("Could not generate mesh schema")

if __name__ == "__main__":
    main()
