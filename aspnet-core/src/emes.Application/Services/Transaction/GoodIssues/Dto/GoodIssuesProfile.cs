

namespace emes.Services.Transaction.GoodIssues.Dto
{
    public class GoodIssuesProfile : Profile
    {
        public GoodIssuesProfile()
        {
            CreateMap<GoodIssuesDto, GoodIssuesModel>();
            CreateMap<Transaction_IssuesDto, MaterialTransactionsModel>();
            CreateMap<GoodIssuesDto, GoodIssuesModel>()
                .ForMember(x => x.Transaction, opt => opt.Ignore());

            CreateMap<GoodIssuesCreateDto, GoodIssuesModel>();
            CreateMap<GoodIssuesCreateDto, GoodIssuesModel>()
                 .ForMember(x => x.Transaction, opt => opt.Ignore());
            
            CreateMap<GoodIssuesUpdateDto, GoodIssuesModel>();
            CreateMap<GoodIssuesUpdateDto, GoodIssuesModel>()
                 .ForMember(x => x.Transaction, opt => opt.Ignore());

        }
    }
}
