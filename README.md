# Change Spy

> Maintain your file integrity!

Single Page App developers are all to familiar with `config` files to store application constants.  Frequently, you'll have multiply copies of the same key for different environments.  For example:

```
export const API_ENDPOINT="https://myproduction.api.com";
// export const API_ENDPOINT="localhost:3000";
```

Have you uncommented the localhost endpoint, and then accidentally commit it to the repository? Never again!  Change Spy helps maintain file integrity in your projects by tracking a file's content, and then offers actions to verify if it had changed and optionally restore to the cached version of the file.  Intended to work with git-hook libraries like [Husky](https://github.com/typicode/husky).


# Installation
```
npm install change-spy --save-dev
```

# Usage

Track a file (no limit on number of tracked files):
```sh
npx spy-init ./path/to/myfile.js
```

Verify if any tracked files have changed:
```sh
npx spy-verify
```

Restore any changed tracked files to their cached state (the file state when spying started):
```sh
npx spy-restore
```

List all files being spied on:
```sh
npx spy-list
```

Clear list of spied files and stop spying:
```sh
npx spy-clear
```



