import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class ShutdownService {
  shutdown(): string {
    // Detectar o sistema operacional e enviar o comando de shutdown correspondente
    const platform = process.platform;
    let command = '';

    if (platform === 'win32') {
      command = 'shutdown /s /f /t 0';  // Comando para Windows
    } else if (platform === 'linux' || platform === 'darwin') {
      command = 'shutdown -h now';  // Comando para Linux/macOS
    } else {
      throw new Error('Sistema operacional não suportado para o shutdown');
    }

    // Executar o comando de shutdown
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao desligar o sistema: ${error.message}`);
        throw new Error(`Erro ao desligar o sistema: ${stderr}`);
      }
      console.log(`Resultado do comando de shutdown: ${stdout}`);
    });

    return 'Comando de shutdown enviado';
  }
}
