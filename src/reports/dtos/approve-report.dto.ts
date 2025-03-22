import {IsBoolean} from 'class-validator';

export class ApproveRequestDTO {
    @IsBoolean()
    approved: boolean;
}