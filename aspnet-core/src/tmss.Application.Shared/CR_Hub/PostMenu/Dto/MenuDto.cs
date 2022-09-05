using System;
using System.Collections.Generic;
using System.Text;

namespace tmss.CR_Hub.PostMenu.Dto
{
    public class MenuDto
    {
        public long Id { get; set; }
        public long? RootParentId { get; set; }
        public string MenuName { get; set; }
        public Boolean LastChild { get; set; }
    }
}
