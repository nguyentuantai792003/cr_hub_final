using System;
using System.Collections.Generic;
using System.Text;

namespace tmss.CR_Hub.PostMenu.Dto
{
    public class SavedPostDto
    {
        public long Id { get; set; }
        public long MenuId { get; set; }
        public string Title { get; set; }
        public string Contents { get; set; }
        public string ShortDescription { get; set; }
        public string FilePath { get; set; }
        public DateTime? CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
    }
}
