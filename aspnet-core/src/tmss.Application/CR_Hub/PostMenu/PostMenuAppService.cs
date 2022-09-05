using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tmss.CR_Hub.Post1;
using tmss.CR_Hub.PostMenu;
using tmss.CR_Hub.PostMenu.Dto;

namespace tmss.CR_Hub.PostMenu1
{
    public class PostMenuAppService : tmssAppServiceBase, IPostMenuAppService
    {
        private readonly IRepository<PostMenu, long> _postMenuAppService;
        private readonly IRepository<Post, long> _postAppService;

        public PostMenuAppService(
            IRepository<PostMenu, long> postMenuAppService,
            IRepository<Post, long> postAppService
            )
        {
            _postMenuAppService = postMenuAppService;
            _postAppService = postAppService;
        }

        public async Task<List<MenuDto>> GetLastMenu()
        {
            var data = (from a in _postMenuAppService.GetAll()
                        where a.LastChild == true
                        select new MenuDto
                        {
                            MenuName = a.MenuName,
                            Id = a.Id
                        }).ToList();

            return await Task.FromResult(data);
        }

        public async Task<List<MenuDto>> GetRootIdFromPostId(long id)
        {
            var data = (from a in _postMenuAppService.GetAll()
                       join b in _postAppService.GetAll()
                       on a.Id equals b.MenuId
                       where b.Id == id
                       select new MenuDto
                       {
                           RootParentId = a.RootParrentId
                       }).ToList();

            return await Task.FromResult(data);
        }

        public async Task<List<BlockPostMenuDto>> LoadAll()
        {
            var data = (from menu in _postMenuAppService.GetAll()
                        where menu.RootParrentId == null && menu.Id != 1 && menu.Id != 45
                        select new BlockPostMenuDto
                        {
                            Id = menu.Id,
                            MenuName = menu.MenuName,
                            PostDtos = (from post in _postAppService.GetAll()
                                        join menu1 in _postMenuAppService.GetAll()
                                        on post.MenuId equals menu1.Id
                                        where menu.Id == menu1.RootParrentId
                                        orderby post.LastModificationTime descending
                                        select new PostDto
                                        {
                                            Id = post.Id,
                                            Title = post.Title,
                                            MenuId = post.MenuId,
                                            CreationTime = post.CreationTime,
                                            LastModificationTime = post.LastModificationTime
                                        }).Take(5).ToList()
                        }).ToList();

            return await Task.FromResult(data);
        }
        public async Task<List<MenuDto>> LoadById(long id)
        {
            var data = (from a in _postMenuAppService.GetAll()
                        where a.Id == id
                        select new MenuDto
                        {
                            Id = a.Id,
                            MenuName = a.MenuName
                        }).ToList();
            return await Task.FromResult(data);
        }

    }
}
