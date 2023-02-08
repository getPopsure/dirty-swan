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

### Commits

Dirty Swan is using a combination of [Husky](https://typicode.github.io/husky/#/), [Commitizen](http://commitizen.github.io/cz-cli/) and [lint-staged](https://github.com/okonet/lint-staged) to track every commit with Linear tickets, versioning, and to keep commit messages uniformed and organized.

1. `git add` all the files you want to commit
2. Run `git commit` - this will start ESLint and check for errors or warnings. If there are any, the cli will quit with relevant messages so make sure you get rid of them before trying to commit again!
3. When successful, you'll see the cli open up with different selections for your commit type. Choose the commit type to continue. This determines how your pull request will be labeled on Github.
4. Next, enter the relevant Linear issue id. They usually look like this: **STO-1234** or **EMU-1234** depending on team the issue is assigned to. You can also skip this step by just pressing enter.
5. Now write down the scope of this commit - if you worked on the checkout functionality, you can simply write "checkout". This step can also be skipped.
6. Write a brief description of the commit
7. Provide a long description of the commit if necessary
8. Provide an answer whether these changes are breaking or not. This determines the versioning of the app.
9. Next, answer if you are sure you want to commit. Confirm the commit message and you're done! 🎊

If `git commit` doesn't start commitizen interactive cli then try running the following steps:

- Install `commitizen` globally if you haven't already: `npm install -g commitizen`
- Run `yarn prepare` to install husky & commitizen
