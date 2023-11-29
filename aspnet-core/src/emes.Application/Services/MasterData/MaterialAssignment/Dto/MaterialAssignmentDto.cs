

namespace emes.Services.MasterData.MaterialAssignment.Dto
{
    [AutoMapFrom(typeof(MaterialAssignmentModel))]
    public class MaterialAssignmentDto : EntityDto<Guid>
    {
        public string MaterialNumber { get; set; }
        public string Description { get; set; }
        public int MaterialStatus { get; set; }
        public string MaterialType { get; set; }
    }
}
