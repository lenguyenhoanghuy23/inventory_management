

namespace emes.Services.MasterData.MaterialGroup.Dto
{
    [AutoMapFrom(typeof(MaterialGroupModel))]
    public class MaterialGroupDto:EntityDto<Guid>
    {
        public string materialGroup { get; set; }

        public string Description { get; set; }
    }
}
