(async () => {
    const { resolve, join } = require('path');
    const fse = require('fs-extra');

    const buildPath = resolve(__dirname, '../build');
    const sourcePath = resolve(__dirname, '../src');

    for (const folder of ['static', 'view']) {
        console.log(folder, 'is coping...');
        await fse
            .copy(join(sourcePath, folder), join(buildPath, folder))
            .then(console.log.bind(null, `${folder} have been copied`))
            .catch(console.error.bind(null, `${folder} haven't been copied`))
    }
})();
