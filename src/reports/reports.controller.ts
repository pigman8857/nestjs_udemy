import { Controller, Post,Body, UseGuards, Patch, Param } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService  } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDTO } from './dtos/report.dto';
import { ApproveRequestDTO } from './dtos/approve-report.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDTO)
    createReport(@Body()body: CreateReportDto,@CurrentUser() user: User ){
        console.log('createReport()',body);
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    approvedReport(@Param('id')id: string, @Body() body: ApproveRequestDTO){
        const {approved} = body;
        return this.reportsService.changeApproval(id,approved);
    }
}
