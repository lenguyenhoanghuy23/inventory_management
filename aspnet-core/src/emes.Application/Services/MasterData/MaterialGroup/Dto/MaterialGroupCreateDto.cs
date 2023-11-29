


namespace emes.Services.MasterData.MaterialGroup.Dto
{
    [AutoMapTo(typeof(MaterialGroupModel))]
    public class MaterialGroupCreateDto
    {

        public string materialGroup { get; set; }
        public string Description { get; set; }
    
    }
}
