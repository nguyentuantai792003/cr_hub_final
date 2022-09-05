using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tmss.Authorization;
using tmss.CR_Hub.Post1;
using tmss.CR_Hub.PostMenu;
using tmss.CR_Hub.PostMenu.Dto;

namespace tmss.CR_Hub
{
    public class PostAppService : tmssAppServiceBase, IPostAppService
    {
        private readonly IRepository<Post, long> _postAppService;
        public PostAppService(IRepository<Post, long> postAppService)
        {
            _postAppService = postAppService;
        }
        public async Task<List<PostDto>> LoadAll()
        {
            var data = (from a in _postAppService.GetAll()
                        orderby a.LastModificationTime descending
                        select new PostDto
                        {
                            Id = a.Id,
                            Title = a.Title,
                            MenuId = a.MenuId,
                            ShortDescription = a.ShortDescription
                        }).ToList();

            return await Task.FromResult(data);
        }

        public async Task<List<PostDto>> LoadByMenuId(long id)
        {
            var data = (from a in _postAppService.GetAll()
                        where a.MenuId == id
                        orderby a.LastModificationTime descending
                        select new PostDto
                        {
                            Id = a.Id,
                            Title = a.Title,
                            MenuId = a.MenuId,
                            ShortDescription = a.ShortDescription,
                            CreationTime = a.CreationTime,
                            LastModificationTime = a.LastModificationTime
                        }).ToList();

            return await Task.FromResult(data);
        }

        public async Task<List<SinglePostDto>> LoadById(long id)
        {
            var data = (from a in _postAppService.GetAll()
                        where a.Id == id
                        select new SinglePostDto
                        {
                            Id = a.Id,
                            Title = a.Title,
                            MenuId = a.MenuId,
                            Contents = a.Contents
                        }).ToList();

            return await Task.FromResult(data);
        }
        [AbpAuthorize(AppPermissions.Pages_Tenant_Post_CreatePost)]
        public async Task<SavedPostDto> SavePost(SavedPostDto savedPost)
        {
            if(savedPost.Id ==  0)
            {
                Post newPost = new Post();
                newPost.Id = savedPost.Id;
                newPost.MenuId = savedPost.MenuId;
                newPost.Title = savedPost.Title;
                newPost.ShortDescription = savedPost.ShortDescription;
                newPost.Contents = savedPost.Contents;
                newPost.FilePath = savedPost.FilePath;
                newPost.CreationTime = DateTime.Now;
                newPost.LastModificationTime = DateTime.Now;
                newPost.CreatorUserId = AbpSession.UserId;
                long id = await _postAppService.InsertAndGetIdAsync(newPost);
                savedPost.Id = newPost.Id;
            }
            else
            {
                Post updatePost = await _postAppService.FirstOrDefaultAsync(savedPost.Id);
                updatePost.MenuId = savedPost.MenuId;
                updatePost.Title = savedPost.Title;
                updatePost.ShortDescription = savedPost.ShortDescription;
                updatePost.Contents = savedPost.Contents;
                updatePost.FilePath = savedPost.FilePath;
                updatePost.LastModificationTime = DateTime.Now;
                updatePost.LastModifierUserId = AbpSession.UserId;
                await _postAppService.UpdateAsync(updatePost);
            }

            return await Task.FromResult(savedPost);
        }
        [AbpAuthorize(AppPermissions.Pages_Tenant_Post_CreatePost)]
        public async Task Delete(long id)
        {
            _postAppService.DeleteAsync(id);
        }

        public async Task<List<PostDto>> LoadRelatedPost(long menuId)
        {
            var data = (from a in _postAppService.GetAll()
                        where a.MenuId == menuId
                        orderby a.LastModificationTime descending
                        select new PostDto
                        {
                            Id = a.Id,
                            Title = a.Title,
                            MenuId = a.MenuId,
                            ShortDescription = a.ShortDescription,
                            CreationTime = a.CreationTime,
                            LastModificationTime = a.LastModificationTime
                        }).Take(5).ToList();

            return await Task.FromResult(data);
        }

        public async Task<List<PostDto>> SearchPost(string searchWord)
        {
            var data = (from a in _postAppService.GetAll()
                        where a.Title.Contains(searchWord) || a.ShortDescription.Contains(searchWord)
                        orderby a.LastModificationTime descending
                        select new PostDto
                        {
                            Id = a.Id,
                            Title = a.Title,
                            MenuId = a.MenuId,
                            ShortDescription = a.ShortDescription,
                            CreationTime = a.CreationTime,
                            LastModificationTime = a.LastModificationTime,
                        }).ToList();

            return await Task.FromResult(data);
        }

        public async Task<List<SavedPostDto>> LoadSavedPostById(long id)
        {
            var data = (from a in _postAppService.GetAll()
                        where a.Id == id
                        select new SavedPostDto
                        {
                            Id = a.Id,
                            Title = a.Title,
                            MenuId = a.MenuId,
                            ShortDescription = a.ShortDescription,
                            Contents = a.Contents
                        }).ToList();

            return await Task.FromResult(data);
        }
    }
}

