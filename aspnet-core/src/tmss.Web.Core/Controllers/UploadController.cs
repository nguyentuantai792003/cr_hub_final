using Abp.UI;
using Abp.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using MimeKit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using tmss.CR_Hub.PostMenu.Dto;

namespace tmss.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : tmssControllerBase
    {
        [HttpPost("{id:int}")]
        [System.Obsolete]
        public List<SavedFileDto> UploadFileToFolder(int id)
        {
            try
            {
                List<SavedFileDto>  savedFileDtos = new List<SavedFileDto>();
                for(int filePos = 0; filePos < Request.Form.Files.Count; filePos++)
                {
                    var file = Request.Form.Files[filePos];

                    string sFileExtension = Path.GetExtension(file.FileName).ToLower();
                    var folderName = Path.Combine("wwwroot", "AttachFile", "Posts");
                    var folderNameDownload = Path.Combine("", "AttachFile", "Posts");
                    string curYear = DateTime.Now.Year.ToString();
                    string curMonth = DateTime.Now.Month.ToString();
                    if (curMonth.Length == 1) curMonth = "0" + curMonth;

                    //check path month and year co ton tai khong
                    folderName = Path.Combine(folderName, curYear + curMonth, id.ToString());
                    if (Directory.Exists(folderName) == false)
                    {
                        Directory.CreateDirectory(folderName);
                    }

                    if (file == null)
                    {
                        throw new UserFriendlyException(L("File_Empty_Error"));
                    }

                    if (file.Length > 1048576 * 100) //100 MB
                    {
                        throw new UserFriendlyException(L("File_SizeLimit_Error"));
                    }

                    if (file.Length > 0)
                    {
                        string resultFormat = "";
                        var intermediaries = file.FileName;
                        char[] array = intermediaries.ToCharArray();
                        for (int i = 1; i < array.Length; i++)
                        {
                            if (array[i - 1] == '.')
                            {
                                for (int j = i; j < array.Length; j++)
                                {
                                    resultFormat = resultFormat + array[j];
                                }
                            }
                        }

                        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                        var ms = new MemoryStream();
                        file.CopyTo(ms);
                        string fileName = Path.GetFileNameWithoutExtension(file.FileName) + DateTime.Now.Millisecond.ToString() + filePos.ToString() + Path.GetExtension(file.FileName) ;
                        var fullPath = Path.Combine(pathToSave, fileName);
                        //var dbPath = Path.Combine(folderNameDownload, file.FileName);
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                        SavedFileDto savedFileDto = new SavedFileDto();
                        savedFileDto.PostId = id;
                        savedFileDto.Path = folderName + '\\' + file.FileName;
                        savedFileDto.Name = file.FileName;
                        savedFileDto.PhysicalName = fileName;
                        savedFileDtos.Add(savedFileDto);
                    }
                    else
                    {
                        return null ;
                    }
                }
                return savedFileDtos;
            }
            catch (UserFriendlyException ex)
            {
                return null; //Json(new AjaxResponse(new ErrorInfo(ex.Message)));
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAttachFileToDownload(string filename)
        {
            if (filename == null)
            {
                throw new UserFriendlyException(L("File_Name_Missing_Error"));
            }

            var folderName = Path.Combine("wwwroot", "AttachFile", "SendClaim");
            var pathToGet = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            string path = Path.Combine(pathToGet, filename);

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }

            memory.Position = 0;
            return File(memory, MimeTypes.GetMimeType(filename), filename);
        }

    }
}
