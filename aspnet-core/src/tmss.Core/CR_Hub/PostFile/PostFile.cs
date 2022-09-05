using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tmss.CR_Hub.PostFile
{
    [Table("PostFile")]
    public class PostFile : FullAuditedEntity<long>, IEntity<long>
    {
        public int PostId { get; set; }
        public string Name { get; set; }
        public string PhysicalName { get; set; }
        public string Path { get; set; }
    }
}
