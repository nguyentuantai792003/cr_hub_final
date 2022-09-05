using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using tmss.CR_Hub.PostMenu.Dto;

namespace tmss.CR_Hub.PostMenu
{
    public interface IPostFileAppService
    {
        Task SavePost(SavedFileDto savedFile);
        Task<List<FileUploadDto>> LoadFileById(int id);
        Task Delete(long id);
    }
}
