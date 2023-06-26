import {resume_profile} from "@src/models";
import { resumeStatusEnum } from "@src/constants/resumeStatus";
import { findByIdAndUpdate } from "@src/helpers/databaseHelpers";
const resumeProfileService={
   async update(resume_id,data){
      return await findByIdAndUpdate(resume_profile,resume_id,{
         ...data,
         status:resumeStatusEnum.SUCCESS
      });
   }
}

export default resumeProfileService