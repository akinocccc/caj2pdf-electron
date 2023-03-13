import child_process, { exec } from 'child_process';
import { dialog, ipcMain } from 'electron';
import path from 'path';

export default function ipc(): void {
  ipcMain.handle('transform:selectFile', () => {
    return new Promise<string[]>((resolve, reject) => {
      dialog
        .showOpenDialog({
          title: '请选择需要转换的文件',
          filters: [
            {
              name: 'CAJ',
              extensions: ['caj'],
            },
            {
              name: 'All',
              extensions: ['*'],
            },
          ],
          properties: ['multiSelections'],
        })
        .then((result) => resolve(result.filePaths))
        .catch((err) => {
          reject(err);
        });
    });
  });
  ipcMain.handle('transform:start', (_, files: any[]) => {
    return new Promise<number[]>((resolve) => {
      const toolsPath = path.resolve(__dirname, '../../tools');
      const results: any[] = [];
      let count = 0;
      files.forEach((item) => {
        let hasError = false;
        const workerProcess = exec(
          `caj2pdf.exe convert ${item.path} -o D:/CAJ2PDF/${item.filename}.pdf`,
          {
            cwd: toolsPath,
          }
        );

        // 打印错误的后台可执行程序输出
        workerProcess.stderr?.on('data', function (data) {
          hasError = true;
        });

        workerProcess.on('close', () => {
          if (hasError) {
            results.push({ ...item, status: 3 });
          } else {
            results.push({ ...item, status: 2 });
          }
          count++;
          if (count === files.length) {
            resolve(results);
          }
        });
      });
    });
  });
}
