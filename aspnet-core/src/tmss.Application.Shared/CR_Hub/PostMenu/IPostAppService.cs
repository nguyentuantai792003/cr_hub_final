using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using tmss.CR_Hub.PostMenu.Dto;

namespace tmss.CR_Hub.PostMenu
{
    public interface IPostAppService : IApplicationService
    {
        Task<List<PostDto>> LoadAll();
        Task<List<PostDto>> LoadByMenuId(long id);
        Task<List<PostDto>> LoadRelatedPost(long menuId);
        Task<List<SinglePostDto>> LoadById(long id);
        Task<List<SavedPostDto>> LoadSavedPostById(long id);
        Task<SavedPostDto> SavePost(SavedPostDto savedPost);
        Task Delete(long id);
        Task<List<PostDto>> SearchPost(string searchWord);
    }
}
