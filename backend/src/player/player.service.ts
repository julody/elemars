import {Injectable} from '@nestjs/common';
import {Player} from './player';
import {Socket} from 'socket.io';
import {PlayerStatus} from './player-status';

@Injectable()
export class PlayerService {
    private players: Record<string, Player>;

    public registerNewPlayer(socket: Socket): void {
        this.players[socket.id] = {
            socket,
            status: PlayerStatus.IN_MAIN_MENU,
        };
    }

    public deletePlayer(socketId: string): void {
        delete this.players[socketId];
    }

    public getPlayer(socketId: string): Player | undefined {
        return this.players[socketId];
    }

    public isPlayerExist(socketId: string): boolean {
        return !!this.getPlayer(socketId);
    }

    public disconnectPlayer(socketId: string): void {
        const player: Player | undefined = this.getPlayer(socketId);

        if (player?.status !== PlayerStatus.IN_MAIN_MENU) {
            // TODO удалять игрока из текущей игры
        }

        this.deletePlayer(socketId);
    }
}
