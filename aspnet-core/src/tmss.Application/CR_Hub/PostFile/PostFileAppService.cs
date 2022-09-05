using Abp.Domain.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tmss.CR_Hub.PostMenu;
using tmss.CR_Hub.PostMenu.Dto;

namespace tmss.CR_Hub.PostFile
{
    public class PostFileAppService : tmssAppServiceBase, IPostFileAppService
    {
        private readonly IRepository<PostFile, long> _postFileAppService;
        public PostFileAppService(IRepository<PostFile, long> postFileAppService)
        {
            _postFileAppService = postFileAppService;
        }

        public async Task<List<FileUploadDto>> LoadFileById(int id)
        {
            var data = (from a in _postFileAppService.GetAll()
                        where a.PostId == id
                        select new FileUploadDto
                        {
                            Id = a.Id,
                            PostId = id,
                            Path = a.Path,
                            PhysicalName = a.PhysicalName,
                            Name = a.Name
                            
                        }).ToList();

            return await Task.FromResult(data);
        }

        public async Task SavePost(SavedFileDto savedFile)
        {
            PostFile newFile = new PostFile();
            newFile.PostId = savedFile.PostId;
            newFile.Path = savedFile.Path;
            newFile.Name = savedFile.Name;
            newFile.PhysicalName = savedFile.PhysicalName;
            await _postFileAppService.InsertAsync(newFile);
        }

        public async Task Delete(long id)
        {
            _postFileAppService.DeleteAsync(id);
        }
    }
}
