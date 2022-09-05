using System;
using System.Collections.Generic;
using System.Text;

namespace tmss.CR_Hub.PostMenu.Dto
{
    public class SinglePostDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public long MenuId { get; set; }
        public string Contents { get; set; }
        public DateTime? CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
    }
}
