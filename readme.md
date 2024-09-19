npm init -y

npm i express

npm i -D @types/express typescript ts-node nodemon

npx tsc --init

{
    "compilerOptions": {
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "baseUrl": "src",
        "outDir": "dist",
        "sourceMap": true,
        "noImplicitAny": true
    },
    "include": ["src/**/*"]
}

npx tsc

optional create: nodemon.json

{
    "watch": ["src"],
    "ext": ".ts, .js",
    "exec": "ts-node ./src/index.ts"
}