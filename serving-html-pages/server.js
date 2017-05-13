// importing modules
import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';

// set the type of file we will be serving
const mimeTypes = {
    'html': 'text/html',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg',
    'png': 'image/png',
    'js': 'text/javascript',
    'css': 'text/css'
}

const port = 3000;
const hostname = '127.0.0.1';

const server = http.createServer((req, res) => {
    const uri = url.parse(req.url).pathname;
    console.log('URI: ', uri);

    const filename = path.join(process.cwd(), unescape(uri));
    console.log('FILENAME: ', filename);

    console.log(`Loading... ${uri}`);
    let stats;

    // trys to get file and assign its stats to 'stats'
    try {
        stats = fs.lstatSync(filename);
    }catch(e){
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('404 Not Found :(');
        res.end();
        return;
    }

    // checks to see if file exists, or maybe a directory, or maybe not at all
    if (stats.isFile()){
        console.log('EXTENSION: ', path.extname(filename).split('.'));
        const mimeType = mimeTypes[path.extname(filename).split('.').reverse()[0]];
        res.writeHead(200, {'Content-type': mimeType});

        // stream index.html to the client
        const fileStream = fs.createReadStream(filename);
        console.log('RESPONSE: ', res);
        fileStream.pipe(res);
    }else if (stats.isDirectory()){
        res.writeHead(302, {'Location': 'index.html'});
        res.end();
    }else{
        res.writeHead(500, {'Content-type': 'text/plain'});
        res.write('500 Internal Error\n');
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
