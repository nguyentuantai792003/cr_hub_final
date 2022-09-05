using System.Collections.Generic;

namespace tmss.CR_Hub.PostMenu.Dto
{
    public class BlockPostMenuDto
    {
        public long Id { get; set; }
        public string MenuName { get; set; }
        public List<PostDto> PostDtos { get; set; }
    }
}
