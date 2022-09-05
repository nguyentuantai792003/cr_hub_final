using System;
using System.Collections.Generic;
using System.Text;

namespace tmss.CR_Hub.PostMenu.Dto
{
    public  class PostDto
    {
        public long Id { get; set; }    
        public string Title { get; set; }
        public long MenuId { get; set; }
        public string MenuName { get; set; }
        public string ShortDescription { get; set; }
        public DateTime? CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
    }
}
