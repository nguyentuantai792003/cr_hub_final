using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tmss.CR_Hub.Post1
{
    [Table("Post")]
    public class Post : FullAuditedEntity<long>, IEntity<long>
    {
        public long MenuId { get; set; }
        public string Title { get; set; }
        public string Contents { get; set; }
        public string ShortDescription { get; set; }
        public string FilePath { get; set; }
    }
}
