#!/usr/bin/env bash
# Rebuild public/models/*.glb from Poly Haven 1k glTF downloads.
# Usage: scripts/optimize-models.sh <dir with <id>/<id>_1k.gltf> <out dir>
# Meshopt geometry compression and WebP textures (max 1024 px) with gltf-transform.
# KTX2 (toktx) is not available in CI/cloud; WebP is supported by three's GLTFLoader.
set -euo pipefail
src="$1"; out="$2"; mkdir -p "$out"
for dir in "$src"/*/; do
  id="$(basename "$dir")"
  npx --yes @gltf-transform/cli@4.5.1 optimize "$dir"/*.gltf "$out/$id.glb" \
    --compress meshopt --texture-compress webp --texture-size 1024
done
