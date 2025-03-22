import { Expose, Transform } from 'class-transformer';
//import { User } from 'src/users/user.entity';

export class ReportDTO {
  @Expose()
  id: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: number;
  @Expose()
  mileage: number;
  @Expose()
  approved: boolean;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  price: number;

  @Transform(({obj}) => obj.user.id)
  @Expose()
  userId: number;
}
