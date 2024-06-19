# DirtySwan UI

Dirty Swan UI is the Design system used at [Feather Insurance](https://feather-insurance.com/)

---

## Installation & Usage

See our official website for installation and usage [dirtyswan.design](http://dirtyswan.design/)

### Preview

Start the development server using

```shell
yarn storybook
```

This will start storybook at `http://localhost:9009/`.

## Contributing

### Releasing a new version

1. Create a tag with the correct version number that follow the [Semantic Versioning](https://semver.org) standard (e.g. `git tag v27.0.0)
2. Use the "Draft a new release" on GitHub and write down some release notes containing "what's updated", "breaking change" (if any) and "Migration from previous version" (if any)

GitHub Action will then automatically pick it up from there and release the new version for you.

### Adding new icons

1. Add the new SVG file to `src/lib/components/icon/assets/
2. Run `yarn generate-icons`

This will auto-generate all the typing, exports and typescript/component files.