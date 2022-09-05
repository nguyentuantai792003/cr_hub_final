using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using tmss.CR_Hub.PostMenu.Dto;

namespace tmss.CR_Hub.PostMenu
{
    public interface IPostMenuAppService : IApplicationService
    {
        Task<List<BlockPostMenuDto>> LoadAll();
        Task<List<MenuDto>> LoadById(long id);
        Task<List<MenuDto>> GetRootIdFromPostId(long id);
        Task<List<MenuDto>> GetLastMenu();
    }
}
