using System;
using System.Collections.Generic;
using System.Text;

namespace tmss.CR_Hub.PostMenu.Dto
{
    public class FileUploadDto
    {
        public long Id { get; set; }
        public int PostId { get; set; }
        public string Name { get; set; }
        public string PhysicalName { get; set; }
        public string Path { get; set; }
    }
}
