# Poweron Language Server Protocol

Implementation of the [Language Server Protocol](https://github.com/Microsoft/language-server-protocol) for the [PowerOn programming language](https://www.episys.com/products/poweron-programming-language/) for Episys credit unions.

This is a very early version with minimal support so far. Only supports Visual Studio Code as a client at this time.

## Functionality

This Language Server works for PowerOn programming language files for Symitar credit unions. This does not provide any syntax highlighting out of the box, I recommend using the [PowerOn extension](https://marketplace.visualstudio.com/items?itemName=0sawaqed.poweron) by Oday Sawaqed in combinatino with this LSP.

This is work in progress and provides or has plans for providing the following language features:

- Intellisense/Code Completions (complete for keywords. functions and record fields WIP)
- Goto Definition (Not implemented yet)
- Diagnostics (Not implemented yet)
- Hover information (Not implemented yet)
- Find References (Not implemented yet)
- And more?

This project is not intended to be ever be a full replacement for the stil excellent RepDev. There are no plans to implement any core connection features. Use [RepDev](https://github.com/jakepoz/RepDev) for that.

## Structure

```
.
├── client // Language Client for VSCode
│   ├── src
│   │   ├── test // Left over from the template, not implemented yet
│   │   └── extension.ts // Language Client entry point
├── package.json // The extension manifest.
└── server // Language Server
    └── src
        └── server.ts // Language Server entry point
```

## Running the extension locally

- Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
- Open VS Code on this folder.
- Press Ctrl+Shift+B to start compiling the client and server in [watch mode](https://code.visualstudio.com/docs/editor/tasks#:~:text=The%20first%20entry%20executes,the%20HelloWorld.js%20file.).
- Switch to the Run and Debug View in the Sidebar (Ctrl+Shift+D).
- Select `Launch Client` from the drop down (if it is not already).
- Press ▷ to run the launch config (F5).
- In the [Extension Development Host](https://code.visualstudio.com/api/get-started/your-first-extension#:~:text=Then%2C%20inside%20the%20editor%2C%20press%20F5.%20This%20will%20compile%20and%20run%20the%20extension%20in%20a%20new%20Extension%20Development%20Host%20window.) instance of VSCode, open a document in 'poweron' language mode (Use Odnay's [PowerOn extension](https://marketplace.visualstudio.com/items?itemName=0sawaqed.poweron) if you aren't already).
  - Start typing to see intellisense and code completions. Other features coming soon.
