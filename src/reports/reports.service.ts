import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report)private repo: Repository<Report>){}

    create(createReportDTO: CreateReportDto, user: User){
        const report = this.repo.create(createReportDTO);
        report.user = user;
        return this.repo.save(report);
    }
}
