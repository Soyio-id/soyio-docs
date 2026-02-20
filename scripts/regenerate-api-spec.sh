#!/usr/bin/env bash

set -euo pipefail

MONOLITH_DIR="${1:-../soyio}"
MONOLITH_SPEC_PATH="${MONOLITH_DIR}/open_api/v1/open-api.yaml"
DOCS_SPEC_PATH="api/soyioapi.yaml"

if [[ ! -f "${MONOLITH_SPEC_PATH}" ]]; then
  echo "Monolith OpenAPI spec not found at: ${MONOLITH_SPEC_PATH}" >&2
  echo "Usage: scripts/regenerate-api-spec.sh [path-to-soyio-repo]" >&2
  exit 1
fi

pnpm dlx swagger-cli bundle "${MONOLITH_SPEC_PATH}" --outfile "${DOCS_SPEC_PATH}"
SOYIO_OPENAPI_SPEC_PATH="${DOCS_SPEC_PATH}" pnpm regenerate-api-docs
