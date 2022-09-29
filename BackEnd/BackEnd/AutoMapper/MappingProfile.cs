using AutoMapper;
using BackEnd.Dto;
using BackEnd.Models;

namespace BackEnd.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PostUserDto, User>();
            CreateMap<User, GetUserDto>()
                   .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role.RoleName));
            CreateMap<PutUserDto, User>();
            CreateMap<PostRoleDto, Role>();
            CreateMap<Role, GetRoleDto>();
            CreateMap<PostPositionDto, Position>();
            CreateMap<PutPositionDto, Position>();
            CreateMap<Position, GetPositionDto>();
            CreateMap<PostEmployeeDto, Employee>();
            CreateMap<PutEmployeeDto, Employee>();
            CreateMap<Employee, GetEmployeeDto>()
                .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.User.Role.RoleName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email))
                .ForMember(dest => dest.PositionName, opt => opt.MapFrom(src => src.Position.Name));
        }
    }
}
