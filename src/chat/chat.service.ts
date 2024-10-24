import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatService {
  private readonly apiKey = process.env['AI_KEY'];

  async sendMessageToGemini(prompt: string, context: string) {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `${context} ${prompt}`,
            },
          ],
        },
      ],
    };

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            key: this.apiKey,
          },
        },
      );

      if (
        response.data &&
        response.data.candidates &&
        response.data.candidates.length > 0
      ) {
        const candidateContent =
          response.data.candidates[0].content.parts[0].text;

        return candidateContent;
      } else {
        throw new HttpException(
          'Unexpected response structure',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      throw new HttpException(
        `Failed to communicate with Gemini: ${error.message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
