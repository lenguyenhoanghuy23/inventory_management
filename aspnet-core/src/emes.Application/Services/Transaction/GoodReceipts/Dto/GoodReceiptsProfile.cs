


namespace emes.Services.Transaction.GoodReceipts.Dto
{
    public class GoodReceiptsProfile : Profile
    {
        public GoodReceiptsProfile()
        {
            CreateMap<GoodReceiptsDto, GoodReceiptsModel>();
            CreateMap<GoodReceiptsDto, GoodReceiptsModel>()
                .ForMember(x => x.Transaction, opt => opt.Ignore())
                .ForMember(x => x.TransactionId, opt => opt.Ignore());


            CreateMap<GoodReceiptsCreateDto, GoodReceiptsModel>();
            CreateMap<GoodReceiptsCreateDto, GoodReceiptsModel>()
                   .ForMember(x => x.Transaction, opt => opt.Ignore())
                  .ForMember(x => x.TransactionId, opt => opt.Ignore());

            CreateMap<GoodReceiptsUpdateDto, GoodReceiptsModel>();
            CreateMap<GoodReceiptsUpdateDto, GoodReceiptsModel>()
                .ForMember(x => x.Transaction, opt => opt.Ignore())
                .ForMember(x => x.TransactionId, opt => opt.Ignore());
        }
    }
}
