import { exec } from 'child_process';
import { dialog, ipcMain, shell } from 'electron';
import path from 'path';
import fs from 'fs';
import { ROOT_PATH } from './constant';

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
      const toolsPath = path.resolve(__dirname, `${ROOT_PATH}/tools`);
      const results: any[] = [];
      let count = 0;
      files.forEach((item) => {
        let hasError = false;
        const outputPath = `D:\\CAJ2PDF\\${item.filename}.pdf`;
        const workerProcess = exec(
          `caj2pdf.exe convert ${item.path} -o ${outputPath}`,
          {
            cwd: toolsPath,
          }
        );

        // workerProcess.stdout?.on('data', (data) => {
        //   console.log(data);
        // });

        // 打印错误的后台可执行程序输出
        workerProcess.stderr?.on('data', () => {
          hasError = true;
        });

        workerProcess.on('close', () => {
          if (hasError) {
            results.push({ ...item, status: 3 });
          } else {
            results.push({
              ...item,
              outputPath,
              status: 2,
            });
          }
          count++;
          if (count === files.length) {
            fs.existsSync(`${toolsPath}/pdf_toc.pdf`) &&
              fs.rmSync(`${toolsPath}/pdf_toc.pdf`);
            fs.existsSync(`${toolsPath}/pdf.tmp`) &&
              fs.rmSync(`${toolsPath}/pdf.tmp`);
            resolve(results);
          }
        });
      });
    });
  });

  ipcMain.on('file:showFileInDir', (_, filePath: string) => {
    shell.showItemInFolder(filePath);
  });

  ipcMain.on('file:openFile', (_, filePath: string) => {
    shell.openPath(filePath);
  });
}
