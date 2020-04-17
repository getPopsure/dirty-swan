# DirtySwan UI

Dirty Swan UI is the Design system used at [Feather Insurance](https://feather-insurance.com/)

---

## Installation

Run the following command using [npm](https://www.npmjs.com):

```bash
npm install @popsure/dirty-swan --save
```

If you prefer [Yarn](https://www.npmjs.com), use the following command instead:

```bash
yarn add @popsure/dirty-swan
```

## Usage

To use Dirty Swan, import the scss file in one of your App entry point (typically `index/js` or `App.js` if you’re using [create react app](https://create-react-app.dev))

```javaScript
import '@popsure/dirty-swan/dist/index.scss';
```

## Contributing

### Releasing a new version using yarn

You can release a new version by using the following command:

```bash
yarn release
```

You will get asked to specify the new version number. We are using [Semantic Versioning](https://semver.org) (or semver) for that.
