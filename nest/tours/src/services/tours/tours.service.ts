import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tour, TourDocument } from 'src/scheme/tour';
import { Model } from 'mongoose';
import { TourDto } from 'src/dto/tours-dto';
import { ITourClient } from 'src/interfaces/Tour';



@Injectable()
export class ToursService {
    private toursCount =10;

    constructor (@InjectModel(Tour.name) private tourModel: Model<TourDocument>){

    }

    async generateTours(): Promise<any>{
        for (let i=0; i<= this.toursCount; i++){
            const tour = new TourDto('test'+i, 'test desc', 'test operator', '300'+i,1);
            const tourData = new this.tourModel(tour);
            await tourData.save();
        }
    }


    async getAllTours(): Promise<Tour[]> {
        return this.tourModel.find();
    }

    async getTourById(id): Promise<Tour[]> {
        return this.tourModel.findById(id);
    }
 
 
    async deleteTours(): Promise<any>{
        return this.tourModel.deleteMany({})
    }

    async uploadTour(body: ITourClient) {
        const tour = new TourDto(body.name, body.description, body.tourOperator, body.price, body.img);
        const tourData = new this.tourModel(tour);
        await tourData.save();
    }
}
