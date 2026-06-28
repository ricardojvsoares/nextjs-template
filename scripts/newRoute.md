# newRoute

A shell script that scaffolds a new Next.js App Router route with the project's shell layout and breadcrumb system.

---

## Setup

Place `newRoute.sh` at the root of your project and make it executable once:

```bash
chmod +x newRoute.sh
```

---

## Usage

```bash
./newRoute.sh <route-name> [base-path]
```

| Argument     | Required | Default   | Description                          |
| ------------ | -------- | --------- | ------------------------------------ |
| `route-name` | Yes      | —         | The route folder name, in kebab-case |
| `base-path`  | No       | `src/app` | Where to create the route            |

---

## Examples

### Top-level route

```bash
pnpm new:route projects
```

```
src/app/projects/
├── _components/
└── page.tsx
```

### Multi-word route

```bash
pnpm new:route user-settings
```

```
src/app/user-settings/
├── _components/
└── page.tsx
```

### Nested route

```bash
pnpm new:route invoices src/app/dashboard
```

```
src/app/dashboard/invoices/
├── _components/
└── page.tsx
```

---

## What gets generated

### Folder structure

```
<route-name>/
├── _components/     ← private components scoped to this route
└── page.tsx         ← the route entry point
```

### `page.tsx`

The generated file uses the shell `Page` compound component and the `Breadcrumb` setter, ready to extend:

```tsx
import { Breadcrumb } from '@/components/shared/shell/breadcrumb.setter';
import { Page } from '@/components/shared/shell/page';
import { Button } from '@/components/ui/button';

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumb
        segments={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
        ]}
      />
      <Page>
        <Page.Header>
          <Page.Heading title="Projects" description="Projects page description" />
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
```

### Name derivation

The script derives all names automatically from the route argument:

| Input           | Folder           | Component          | Breadcrumb label |
| --------------- | ---------------- | ------------------ | ---------------- |
| `projects`      | `projects/`      | `ProjectsPage`     | `Projects`       |
| `user-settings` | `user-settings/` | `UserSettingsPage` | `User Settings`  |
| `api-keys`      | `api-keys/`      | `ApiKeysPage`      | `Api Keys`       |

---

## After scaffolding

There are two things you will typically want to adjust manually:

**1. Breadcrumb segments**

The template only includes `Home` and the new route. For nested routes, insert the parent segments:

```tsx
// Generated (top-level)
segments={[
  { label: 'Home', href: '/' },
  { label: 'Invoices', href: '/dashboard/invoices' },
]}

// Adjusted (nested under Dashboard)
segments={[
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Invoices', href: '/dashboard/invoices' },
]}
```

**2. Page heading and description**

Replace the generated placeholder with the real copy:

```tsx
// Generated
<Page.Heading title="Invoices" description="Invoices page description" />

// Adjusted
<Page.Heading title="Invoices" description="Manage and track your billing history" />
```

---

## Guards

The script will exit with an error and make no changes if:

- No route name is provided
- The target directory already exists

```bash
# Example — route already exists
./newRoute.sh projects
# Route already exists: src/app/projects
```

---

## Tips

- Keep `newRoute.sh` at the project root alongside `package.json`
- Add it to your project `README` so teammates know it exists
- The `_components` folder follows Next.js conventions — files inside are not treated as routes
