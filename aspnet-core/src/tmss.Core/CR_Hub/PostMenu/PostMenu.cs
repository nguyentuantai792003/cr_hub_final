using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tmss.CR_Hub.PostMenu1
{
    [Table("PostMenu")]
    public class PostMenu : FullAuditedEntity<long>, IEntity<long>
    {
        public long? ParentId { get; set; }
        public long? RootParrentId { get; set; }
        public int Ordering { get; set; }
        public string MenuName { get; set; }
        public Boolean LastChild { get; set; }
    }
}
