import { Injectable } from '@nestjs/common';
import * as Argon2 from "argon2";
import { HttpStatus } from '@nestjs/common/enums'
import { HttpException } from '@nestjs/common/exceptions'
import * as cloudinary from 'cloudinary'
import { ConfigService } from "@nestjs/config/dist/config.service";
import axios from "axios";
import sharp from "sharp";


@Injectable()
export class LibService {
    constructor(private config: ConfigService,) {


    }

    // _______________argon start_______________
    //******* get hased passweord *******
    async getHashed(plainStr: string): Promise<string> {
        try {
            const hash = await Argon2.hash(plainStr)
            return hash
        } catch (error) {
            console.log(error);
            throw new HttpException('Something Went Wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //******* Veryfy passweord *******
    async VerifyPassword(HashedPassword:string, PlainPassword: string) {
        try {
            return await Argon2.verify(HashedPassword, PlainPassword)
        } catch (error) {
            console.log(error);
            throw new HttpException('Something Went Wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    // _______________argon End_______________
    // _______________Cld Start_______________
    cldInitiate() {
        cloudinary.v2.config({
            cloud_name: this.config.get('CLOUDINARY_NAME'),
            api_key: this.config.get('CLOUDINARY_API_KEY'),
            api_secret: this.config.get('CLOUDINARY_API_SECRET')
        });
    }

    async cldUpload(url: string):Promise<{
        url:string,
        width:number,
        height:number
    }> {
        await this.cldInitiate();
        try {
            const Cls = await cloudinary.v2.uploader.upload(url);
            const data = {
                url: Cls.url,
                width: Cls.width,
                height: Cls.height
            };
            return data;
        } catch (error) {
            console.log(error);
            throw new HttpException('Something Went Wrong or invalid img url or string', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // _______________Cld End_______________
    // _______________Sherp Start_______________
    async uploadWithSharp(url: string):Promise<{
        isSuccess:boolean,
        url:string|'NOT_FOUND'|'FAILED'
    }> {
        try {
            const imgBuffer = await axios.get(url, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(imgBuffer.data, 'binary');
            const data = await sharp(imageBuffer).png({ quality: 20 }).toBuffer();
            const base64String = data.toString('base64');
            const cld = await this.cldUpload(`data:image/png;base64,${base64String}`);
            if (cld && cld.url) {
                return {
                    isSuccess: true,
                    url: cld.url
                };
            } else {
                return {
                    isSuccess: false,
                    url: 'NOT_FOUND'
                };
            }
        } catch (error) {
            console.log(error);
            return {
                isSuccess: false,
                url: 'FAILED'
            };
        }
    }

    // _______________Sherp End_______________
}
