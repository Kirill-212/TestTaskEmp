using BackEnd.AutoMapper;
using BackEnd.ExceptionMiddleware;
using BackEnd.Models;
using BackEnd.Repositories;
using BackEnd.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using BackEnd.Auth;
using BackEnd.SupportExcel;
using System.Security.Claims;

namespace BackEnd
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                     .AddJwtBearer(options =>
                     {
                         options.RequireHttpsMetadata = false;
                         options.TokenValidationParameters = new TokenValidationParameters
                         {
                             ValidateIssuer = true,
                             ValidIssuer = AuthOptions.ISSUER,
                             ValidateAudience = true,
                             ValidAudience = AuthOptions.AUDIENCE,
                             ValidateLifetime = true,
                             IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                             ValidateIssuerSigningKey = true,
                         };
                     });

            services.AddDbContext<DataBaseContext>(options =>
                  options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddAutoMapper(typeof(MappingProfile));
            services.AddScoped<IAsyncRepositoryUser<User>, AsyncRepositoryUser>();
            services.AddScoped<IAsyncRepositoryRole<Role>, AsyncRepositoryRole>();
            services.AddScoped<IAsyncRepositoryEmployee<Employee>, AsyncRepositoryEmployee>();
            services.AddScoped<IAsyncRepositoryPosition<Position>, AsyncRepositoryPosition>();
            services.AddScoped<IAsyncServiceUser<User>, AsyncServiceUser>();
            services.AddScoped<IAsyncServiceRole<Role>, AsyncServiceRole>();
            services.AddScoped<IAsyncServicePosition<Position>, AsyncServicePosition>();
            services.AddScoped<IAsyncServiceEmployee<Employee>, AsyncServiceEmployee>();
            services.AddScoped<IAsyncServiceAuth<ClaimsIdentity>, AsyncServiceAuth>();
            services.AddScoped<IGenerateExcelFile, GenerateExcelFile>();
            services.AddTransient<ExceptionHandlingMiddleware>();
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "BackEnd", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BackEnd v1"));
            }
            app.UseMiddleware<ExceptionHandlingMiddleware>();
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(builder => builder.AllowCredentials().WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod());
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
