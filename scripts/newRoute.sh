#!/usr/bin/env bash
set -euo pipefail

# ─── Args ────────────────────────────────────────────────────────────────────

if [[ $# -lt 1 ]]; then
  echo "Usage: newRoute <route-name> [base-path]"
  echo "  route-name  e.g. projects, user-settings"
  echo "  base-path   optional, default: src/app"
  exit 1
fi

ROUTE_RAW="$1"
BASE_PATH="${2:-src/app/(app)}"

# ─── Derive names ─────────────────────────────────────────────────────────────

# Full kebab-case path (lowercased, spaces → hyphens), preserving slashes
ROUTE_FOLDER=$(echo "$ROUTE_RAW" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Last segment only — used for component name and label
# e.g. "dashboard/user-settings" → "user-settings"
LEAF=$(echo "$ROUTE_FOLDER" | awk -F'/' '{print $NF}')

# PascalCase from the leaf segment only (user-settings → UserSettings)
PASCAL=$(echo "$LEAF" | sed -E 's/(^|-)([a-z])/\U\2/g')

# Human label from the leaf segment (user-settings → User Settings)
LABEL=$(echo "$LEAF" | sed -E 's/-/ /g' | sed -E 's/(^| )([a-z])/\U\2/g')

# Build breadcrumb segments from each part of the path
# e.g. "dashboard/user-settings" → Home, Dashboard (/dashboard), User Settings (/dashboard/user-settings)
SEGMENTS="{ label: 'Home', href: '/' },"$'\n'
ACCUMULATED=""
IFS='/' read -ra PARTS <<< "$ROUTE_FOLDER"
for PART in "${PARTS[@]}"; do
  ACCUMULATED="${ACCUMULATED}/${PART}"
  PART_LABEL=$(echo "$PART" | sed -E 's/-/ /g' | sed -E 's/(^| )([a-z])/\U\2/g')
  SEGMENTS+="          { label: '${PART_LABEL}', href: '${ACCUMULATED}' },"$'\n'
done
# Trim trailing newline and comma from last segment
SEGMENTS=$(echo "$SEGMENTS" | sed -E '$ s/,$//')

# ─── Paths ────────────────────────────────────────────────────────────────────

ROUTE_DIR="${BASE_PATH}/${ROUTE_FOLDER}"
COMPONENTS_DIR="${ROUTE_DIR}/_components"
PAGE_FILE="${ROUTE_DIR}/page.tsx"

# ─── Guard ────────────────────────────────────────────────────────────────────

if [[ -d "$ROUTE_DIR" ]]; then
  echo "Route already exists: $ROUTE_DIR"
  exit 1
fi

# ─── Scaffold ─────────────────────────────────────────────────────────────────

mkdir -p "$COMPONENTS_DIR"

cat > "$PAGE_FILE" <<EOF
import { Breadcrumb } from '@/components/shared/shell/breadcrumb.setter';
import { Page } from '@/components/shared/shell/page';
import { Button } from '@/components/ui/button';

export default function ${PASCAL}Page() {
  return (
    <>
      <Breadcrumb
        segments={[
          ${SEGMENTS}
        ]}
      />
      <Page>
        <Page.Header>
          <Page.Heading title="${LABEL}" description="${LABEL} page description" />
          <Page.Actions>
            <Button>Action button</Button>
          </Page.Actions>
        </Page.Header>
        <Page.Content>
          <h1>Page content or custom components here</h1>
        </Page.Content>
      </Page>
    </>
  );
}
EOF

# ─── Done ─────────────────────────────────────────────────────────────────────

echo ""
echo "Route created: ${ROUTE_DIR}"
echo ""
echo "   ${ROUTE_DIR}/"
echo "   ├── _components/"
echo "   └── page.tsx"
echo ""
echo "   Component: ${PASCAL}Page"
echo "   Route:     /${ROUTE_FOLDER}"
echo ""