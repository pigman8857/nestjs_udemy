import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report)private repo: Repository<Report>){}

    create(createReportDTO: CreateReportDto){
        const report = this.repo.create(createReportDTO);
        return this.repo.save(report);
    }
}
